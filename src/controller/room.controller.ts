import { Request, Response, NextFunction, RequestHandler } from "express";
import { successResponse } from "../common/successResponse";
import {
    createRoomService,
    deleteRoomService,
    getAllRoomsService,
    getRoomByIdService,
    getRoomsByHotelIdService,
    updateRoomService
} from "../service/room.service";
import { asyncCatchFn } from "../utils/asyncFunction";


export const createRoomController: RequestHandler = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {


        const room = await createRoomService(req.validatedParams.hotelId, req.validatedBody);
        successResponse(
            res,
            201,
            "Room  created successfull.",
            { room }
        )

    })
export const updateRoomController: RequestHandler = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {

        const room = await updateRoomService(req);
        successResponse(
            res,
            201,
            "Room  updated successfull.",
            { room }
        )

    })
export const deleteRoomController: RequestHandler = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {

        const room = await deleteRoomService(req);
        successResponse(
            res,
            201,
            "Room  deleted successfull.",
            { room }
        )

    })
export const getAllRoomByHotelIdController: RequestHandler = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {

        const data = await getRoomsByHotelIdService(req);
        successResponse(
            res,
            200,
            "Room  get successfull.",
            data
        )

    })
export const getRoomByIdController: RequestHandler = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {

        const room = await getRoomByIdService(req.validatedParams.roomId);
        successResponse(
            res,
            200,
            "Room  get by id successfull.",
            { room }
        )

    })

export const getAllRoomsController: RequestHandler = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = await getAllRoomsService(req);
        successResponse(
            res,
            200,
            "Get all rooms successfull.",
            data
        )
    }
)