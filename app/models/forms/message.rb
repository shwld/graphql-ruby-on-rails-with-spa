class Forms::Message
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :id, :string
  attribute :text, :string

  validates :text, presence: true

  def valid!
    raise ActiveRecord::RecordInvalid, self if invalid?
  end
end
