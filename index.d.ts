import events = require('events');

interface FeathersApp {
  // Authentication.
  authenticate(options: any) :Promise<any>;
  logout(): void;
  get(type: string): any;

  // Services.
  service(name: string): FeathersService;
}

interface FeathersService extends events.EventEmitter {
  find(params?: any): Promise<any>;
  create(data: any, params?: any): Promise<any>;
  update(id: string, data: any, params?:any): Promise<any>;
  patch(id: string, data: any, params?:any) : Promise<any>;
  remove(id: string, params?: any): Promise<any>;
}
