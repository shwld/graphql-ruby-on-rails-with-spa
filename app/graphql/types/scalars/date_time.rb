class Types::Scalars::DateTime < GraphQL::Schema::Scalar
  description 'DateTime'

  def self.coerce_input(value, _context)
    Time.zone.parse(value)
  end

  def self.coerce_result(value, _context)
    # I18n.l(value, format: :default)
    value
  end
end
