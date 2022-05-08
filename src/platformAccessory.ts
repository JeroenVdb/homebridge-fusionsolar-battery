import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { ExampleHomebridgePlatform } from './platform';

export class ExamplePlatformAccessory {
  private service: Service;

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    this.service = this.accessory.getService(this.platform.Service.Battery) || this.accessory.addService(this.platform.Service.Battery);

    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.exampleDisplayName);

    this.service.getCharacteristic(this.platform.Characteristic.BatteryLevel)
      .onGet(this.getLevel.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.StatusLowBattery)
      .onGet(this.getStatusBattery.bind(this));
  }

  async getLevel(): Promise<CharacteristicValue> {
    this.platform.log.debug('Level is ', 60);
    return 60;
  }

  async getStatusBattery(): Promise<CharacteristicValue> {
    this.platform.log.debug('Status battery is ', this.platform.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL);
    return this.platform.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
  }
}
