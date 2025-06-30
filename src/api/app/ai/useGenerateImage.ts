import { createMutationHook } from '../../engine/factories';
import { aiClient } from '../../client.ts';
import { OutputAnnotation } from '../../../pages/App/pages/EditorPage/core/annotators/types.ts';

interface GenerateImageRequest{
  number_of_images: number
  aspect_ratio: string
  base_image ?: string
  model_to_use: string
  prompt :string
  negative_prompt: string
}

export const useGenerateImage = () => (
  createMutationHook<GenerateImageRequest, {image: string}>("POST", "generate_images/", {
    apiClient: aiClient
  })
)

export const useGenerateImageAutolabelPipeline = () => (
  createMutationHook<GenerateImageRequest, {image: string, annotations: OutputAnnotation<any>[]}>("POST", "generate_images/pipeline_grounded_sam/", {
    apiClient: aiClient
  })
)

interface GenerateImageVariantsRequest{
  number_of_images: number
  aspect_ratio: string
  image : string
  prompt :string
  negative_prompt: string,
  labels: {id: number, name: string, prompt: string}[]
}

export const useGenerateImageVariants = () => (
  createMutationHook<GenerateImageVariantsRequest, {image: string, annotations: OutputAnnotation<any>[]}>("POST", "generate_images/image_variants/", {
    apiClient: aiClient
  })
)
