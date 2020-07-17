class UserPolicy < ApplicationPolicy
  def show?
    true
  end

  def edit?
    user.id == record.id
  end
end
