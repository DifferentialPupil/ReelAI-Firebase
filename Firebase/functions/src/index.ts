/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {imageToVideo, getTask, deleteTask} from "./runwayml";
import {TaskRetrieveResponse} from "@runwayml/sdk/resources/tasks.mjs";
import {ImageToVideoCreateParams} from "@runwayml/sdk/resources/image-to-video";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const imageToVideoFunc = onRequest(async (request, response) => {
  try {
    logger.info("Received imageToVideo request", {structuredData: true});
    const options: ImageToVideoCreateParams = request.body;
    const id = await imageToVideo(options);
    response.status(200).json({id});
  } catch (error: any) {
    logger.error("Error in imageToVideo", {error: error.message});
    response.status(500).json({error: error.message});
  }
});

export const getTaskFunc = onRequest(async (request, response) => {
  try {
    logger.info("Received getTask request", {structuredData: true});
    const taskIdRaw = request.params[0];
    if (!taskIdRaw) {
      response.status(400).json({error: "taskId is required!"});
      return;
    }
    const taskId = Array.isArray(taskIdRaw) ?
        taskIdRaw[0] : taskIdRaw as string;
    const task: TaskRetrieveResponse = await getTask(taskId);
    response.status(200).json(task);
  } catch (error: any) {
    logger.error("Error in getTask", {error: error.message});
    response.status(500).json({error: error.message});
  }
});

export const deleteTaskFunc = onRequest(async (request, response) => {
  try {
    logger.info("Received deleteTask request", {structuredData: true});
    const taskIdRaw = request.params[0];
    if (!taskIdRaw) {
      response.status(400).json({error: "taskId is required"});
      return;
    }
    const taskId = Array.isArray(taskIdRaw) ?
        taskIdRaw[0] : taskIdRaw as string;
    await deleteTask(taskId);
    response.status(200).json({success: true});
  } catch (error: any) {
    logger.error("Error in cancelTask", {error: error.message});
    response.status(500).json({error: error.message});
  }
});
