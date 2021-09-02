// @ts-ignore
declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client/core'
  import { HttpOptions } from '@apollo/client/link/http'

  export type UploadLinkOptions = HttpOptions &
    Partial<{
      isExtractableFile: File | Blob
      formDataAppendFile: File | Blob
    }>

  export function createUploadLink(
    uploadLinkOptions?: UploadLinkOptions
  ): ApolloLink
}
