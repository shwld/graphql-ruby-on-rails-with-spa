module Types
  class BaseObject < GraphQL::Schema::Object
    field_class Types::BaseField

    global_id_field :id
  end
end
