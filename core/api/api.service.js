import ApiCoreService from 'api-core-service';

export default class CoreService extends ApiCoreService {
    constructor() {
        super();
    }


    setDefaultApiType() {
        this.setApiType('API_URL');
    }

    headerInterceptor() {
        return {
            'Content-Language': 'tr-TR',
            'Accept-language': 'tr-TR',
        };
    }

}
