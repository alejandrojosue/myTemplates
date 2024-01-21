export const apiBaseUrl =
    import.meta.env.DEV ?
        import.meta.env.VITE_API_URL_DEV :
        import.meta.env.VITE_API_URL_PROD
// 'https://vgrz5633-1337.use2.devtunnels.ms/api';
export const URL_DEVELOP =
    import.meta.env.DEV ?
        import.meta.env.VITE_URL_DEV :
        import.meta.env.VITE_URL_PROD
// 'https://vgrz5633-1337.use2.devtunnels.ms'