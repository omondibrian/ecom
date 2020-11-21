export interface IApp {
  getRoutes: (routes: any[]) => Generator<any, void, unknown>;
  start(): void;
}

export default class Application implements IApp {
  constructor(
    private readonly App: any,
    private readonly Port: number,
    private readonly routesOBj = [],
  ) {
    const generatedRoutes = this.getRoutes(this.routesOBj);
    
    //todo:iterate over the generated routes and add them into the app.use middleware
  }
  //yeilds the route parameter to be registed by the application middleware
  getRoutes = function* (routes: any[]) {
    for (let i = 0; i < routes.length; i++) {
      yield routes[i];
    }
  };

  start() {
    this.App.listen(this.Port, `server is listening on port ${this.Port}`);
  }
}
