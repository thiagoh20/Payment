export function sanitizeResponse(response: any) {
    if (response?.data?.payload) {
      response.data.payload = Object.entries(response.data.payload).reduce(
        (acc: Record<string, any>, [key, value]) => {
          if (!['preBalance', 'posBalance', 'tmpBalance'].includes(key)) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
    }
    return response;
  }
  