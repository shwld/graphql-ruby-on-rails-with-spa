# active storageに直接attachできるfileタイプ
class Types::Scalars::UploadActiveStorageFile < GraphQL::Schema::Scalar
  description 'UploadActiveStorageFile'

  def self.coerce_input(value, _context)
    return nil unless value
    # 無駄なファイルがアップロードされるので定期的に関連付けのないファイルをpurgeしたい
    blob = ActiveStorage::Blob.create_after_unfurling!(
      io: value.open,
      filename: value.original_filename,
      content_type: value.content_type,
    )
    # create_and_upload!だとActiveStorage::IntegrityErrorになる
    blob.upload(value)
    blob
  end
end
