import { NextFunction, Request, Response } from "express";
import ActuatorModel from "../models/Actuator"
import ApiResponse from "@/modules/Interface";
import { verifyJwt } from "@/middlewares/auth";

export default {


  //si requete marche instancier class ApiResponse avec a l'interieur ex : "tableau de actuators" + [actuators]
  //si ca marche pas renvoyer ApiResponse avec error as Error
  allActuators: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));
    
    const sensors = ActuatorModel.find((err: any, actuators: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Liste des actuators :", actuators, undefined)
        res.send(resultat);
      }
    },)
  },

  oneActuator: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));
    
    const sensor = ActuatorModel.findById(req.params.id, (err: any, actuator: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Actuator :", actuator, undefined)
        res.send(resultat);
      }
    },)
  },

  postActuator: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

    const actuator = new ActuatorModel(req.body);
    actuator.save((err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Actuator créé :", actuator, undefined)
        res.send(resultat);
      }
    })
  },

  updateActuator: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

    let actuator = ActuatorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, actuator: any) => {
        if (err) {
          const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
          res.send(resultat);
        } else {
          const resultat = new ApiResponse("Actuator modifié :", actuator, undefined)
          res.send(resultat);
        }
      }
    )
  },

  deleteActuator: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

    
    const actuator = ActuatorModel.deleteOne({ _id: req.params.id}, (err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Actuator supprimé.", undefined, undefined)
        res.send(resultat);
      }
    })
  },
};
