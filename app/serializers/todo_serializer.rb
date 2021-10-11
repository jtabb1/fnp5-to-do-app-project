class TodoSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :type_id, :todo_name
  has_one :user
  has_one :type
end
