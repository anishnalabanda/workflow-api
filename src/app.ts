import * as bodyParser from 'body-parser';
import * as express from 'express';
import Controller from './interfaces/controller/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(5000, () => {
      console.log(`App listening on the port 5000`);
    });
  }
  

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      res.append('Access-Control-Allow-Origin', ['*']);
      res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.append('Access-Control-Allow-Headers', 'Content-Type');
      next();
  });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    this.app.get('/', function(request, response) {
      response.send(`<div><h2>WORKFLOW API</h2><br/><br/><div>To perform approval workflow operations got to /api/approvalworkflow<div></div>`);
    });
    controllers.forEach((controller) => {
      console.log(controller.path);
      this.app.get(controller.path, controller.router);
    });
  }
}

export default App;
