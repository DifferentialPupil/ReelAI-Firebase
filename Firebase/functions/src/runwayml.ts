import RunwayML from "@runwayml/sdk";
import {TaskRetrieveResponse} from "@runwayml/sdk/resources/tasks.mjs";
import {ImageToVideoCreateParams} from "@runwayml/sdk/resources/image-to-video";

export const client = new RunwayML({
  apiKey: "key_cf336b77a1a514b8173c751c11c86f425784f6b3c86fc46fb77cfca31bd4b57a7494d18669b73070d4c72037dc5cff3a3f1e0d27ada797d5c35e061ec74a4001",
});

/**
 * Creates a new image-to-video task using the specified image URL and prompt text.
 *
 * This function uses the RunwayML API to create a new image-to-video task.
 *
 * @param promptImageURL - A string representing the URL of the image to be used as the prompt.
 * @param promptText - A string representing the prompt text for the image-to-video task.
 * @param options - An optional object containing additional options for the image-to-video task.
 * @return A promise that resolves to the ID of the created image-to-video task.
 */
export async function imageToVideo(options: ImageToVideoCreateParams): Promise<string> {
  options.model = "gen3a_turbo";
  const response = await client.imageToVideo.create({
    ...options,
  });

  return response.id;
}

/**
 * Retrieves the status of an image-to-video task.
 *
 * This function uses the RunwayML API to retrieve the status of an image-to-video task.
 *
 * @param taskId - A string representing the ID of the image-to-video task to retrieve the status of.
 * @return A promise that resolves to the status of the image-to-video task.
 */
export async function getTask(taskId: string): Promise<TaskRetrieveResponse> {
  const response = await client.tasks.retrieve(taskId);

  const task: TaskRetrieveResponse = {
    id: response.id,
    status: response.status,
    createdAt: response.createdAt,
    failure: response.failure,
    failureCode: response.failureCode,
    output: response.output,
    progress: response.progress,
  };

  return task;
}

/**
 * Cancels or deletes an image-to-video task.
 *
 * This function uses the RunwayML API to cancel or delete an image-to-video task.
 *
 * @param taskId - A string representing the ID of the image-to-video task to cancel or delete.
 */
export async function deleteTask(taskId: string): Promise<void> {
  await client.tasks.delete(taskId);
}
