export class servicePriceSetting {
    _id: string;
    company: string;
    Product?: any;
    customer?: any;
    salesman?: any;
    servicePriceSettingCode: string
    priceSettings: servicePriceSettingsChild[];
}

export class servicePriceSettingsChild {
    product?: any;
    service: any;
    normal: number;
    express: number;
    urgent: number;
}

export class ServicePriceSettingFilterDTO {
    Product?: string;
    salesman?: string;
    customer?: string;
}
