import { SettingsModule } from '../../../shared/enums/settingsModule.enum';

export class PrintSettings {
  _id: string;
  company: string;
  returnPolicy: string;
  greetingsText: string;
  website: string;
  others: string;
  barcode: boolean;
}

export class PrintImage {
  company: string;
  keyword: string;
  module: SettingsModule;
  imageString: string;
}
