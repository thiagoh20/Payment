import axios from "axios";
import { Request, Response } from "express";
import {
  BASE_URL_CORE_RECARGAS,
  CORE_RECARGAS_API_KEY,
} from "../../config/config.js";
import {
  ICategory,
  IProduct,
} from "../../interface/paymentCategory.interface.js";

export class paymentWayServices {
  /**
   * @description Obtiene las categorias de productos desde el servicio core recargas
   * @param req Request
   * @param res Response
   * @returns {Promise<any>} Promise que resuelve con la respuesta del servicio
   */
  static async getCategories(req: Request, res: Response): Promise<any> {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URL_CORE_RECARGAS}/product/categories`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
      });

      const categories: ICategory[] = response.data.data || [];
      const targetName = req.params.name;

      const findCategoryByName = (
        categories: ICategory[],
        name: string
      ): ICategory | null => {
        // Recursivamente busca la categoría por nombre
        for (const category of categories) {
          if (category.name.toLowerCase() === name.toLowerCase()) {
            return category;
          }
          if (category.categories && category.categories.length > 0) {
            const found = findCategoryByName(category.categories, name);
            if (found) {
              return found;
            }
          }
        }
        return null;
      };

      const foundCategory = findCategoryByName(categories, targetName);

      if (!foundCategory) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      const collectEnabledProducts = (category: ICategory): IProduct[] => {
        let allProducts: IProduct[] = [];

        //categoria principal
        if (category.products && category.products.length > 0) {
          const enabled = category.products.filter(
            (p) => p.status === "enabled"
          );
          allProducts = allProducts.concat(enabled);
        }

        //subcategorias
        if (category.categories && category.categories.length > 0) {
          for (const sub of category.categories) {
            allProducts = allProducts.concat(collectEnabledProducts(sub));
          }
        }
        return allProducts;
      };

      const enabledProducts = collectEnabledProducts(foundCategory);

      const result = {
        name: foundCategory.name,
        id: foundCategory.id,
        products: enabledProducts.map((product) => ({
          id_product: product.id,
          name: product.name,
          id_category: product.categoryId,
          amount: product.amount,
          ...(product.status ? { status: product.status } : {}),
        })),
      };

      return res.json([result]);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener las categorias",
        error: error.message,
      });
    }
  }

  /**
   * @description Obtiene los productos desde el servicio core recargas
   * @param req Request
   * @param res Response
   * @returns {Promise<any>} Promise que resuelve con la respuesta del servicio
   */

  static async getProducts(req: Request, res: Response): Promise<any> {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URL_CORE_RECARGAS}/product/categories`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
      });

      const data = response.data?.data || [];
      const targetName = req.params.name;

      let products: IProduct[] = [];

      console.log(data);

      const searchProducts = (categories: any[]): IProduct[] => {
        for (const category of categories) {
          const matched = (category.products || [])
            .filter(
              (product: IProduct) =>
                product.name === targetName && product.status === "enabled"
            )
            .map((product: IProduct) => ({
              id_product: product.id,
              name: product.name,
              id_category: product.categoryId,
              amount: product.amount,
              status: product.status,
            }));

          if (matched.length > 0) return matched;

          if (category.categories) {
            const foundInSub = searchProducts(category.categories);
            if (foundInSub.length > 0) return foundInSub;
          }
        }

        return [];
      };

      products = searchProducts(data);

      res.json(products);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  }

  static async getProductsById(req: Request, res: Response): Promise<any> {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URL_CORE_RECARGAS}/product/categories`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
      });

      const data = response.data?.data || [];
      const productId = req.params.productId;

      let products: IProduct[] = [];

      const searchProductsById = (categories: any[]): IProduct[] => {
        for (const category of categories) {
          const matched = (category.products || [])
            .filter(
              (product: IProduct) =>
                product.id === Number(productId) && product.status === "enabled"
            )
            .map((product: IProduct) => ({
              id_product: product.id,
              name: product.name,
              id_category: product.categoryId,
              amount: product.amount,
              status: product.status,
            }));

          if (matched.length > 0) return matched;

          if (category.categories) {
            const foundInSub = searchProductsById(category.categories);
            if (foundInSub.length > 0) return foundInSub;
          }
        }

        return [];
      };

      products = searchProductsById(data);

      res.json(products);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  }

  static async postVentaFacturasMethod(body: GeneralModel) {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL_CORE_RECARGAS}/ventas/VentaFacturas`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
        data: body,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async postVentaPines(body: VentaPinesModel) {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL_CORE_RECARGAS}/ventas/VentaPines`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
        data: body,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async postVentaSuerteAzarMethod(body: GeneralModel) {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL_CORE_RECARGAS}/ventas/endpoint`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
        data: body,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async postRecargasPaquetesClaroMethod(
    body: RecargasPaquetesClaroModel
  ) {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL_CORE_RECARGAS}/ventas/RecargasPaquetesClaro`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
        data: body,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * @description Obtiene todos los productos desde el servicio core recargas
   * @param req Request
   * @param res Response
   * @returns {Promise<any>} Promise que resuelve con la respuesta del servicio
   */

  static async getProductosSearch(req: Request, res: Response) {
    try {
      const response = await axios({
        method: "POST",
        data: {
          query: req.params.name,
        },
        url: `${BASE_URL_CORE_RECARGAS}/product/search`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
      });

      res.json(response.data);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  }

  static async getInvoiceInfo(req: Request, res: Response) {
    const body = req.body;
    console.log(body);
    try {
      const response = await axios({
        method: "POST",
        data: {
          productId: body.productId,
          queryType: "BILLData",
          data: {
            reference: String(body.reference),
          },
          _channel: "web",
        },
        url: `${BASE_URL_CORE_RECARGAS}/consultas/ConsultaReferencia`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
      });

      res.json(response.data);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  }

  static async AplicarCompraEfectivo(idTransaccion: any) {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL_CORE_RECARGAS}/ventas/AplicarCompraEfectivo`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CORE_RECARGAS_API_KEY}`,
        },
        data: {
          usuario: "CAPITALPOCKET CORP SAS",
          medioPago: "tarjetaCredito",
          idTransaccion: idTransaccion,
        },
      });
      return response.data;
    } catch (error: any) {
      // throw new Error(error)
      return {
        error: error.response.data,
        information:
          "Por favor ponte en contacto con el administrador lina.otalvaro@cpocket.global o al +573215086949",
      };
    }
  }
}
