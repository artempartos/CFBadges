class Order < ActiveRecord::Base

  has_many :items, class_name: "Order::Item"

  mount_uploader :image, ::ImageUploader

  state_machine :state, initial: :active do

    state :active
    state :rejected
    state :completed

    event :activate do
      transition rejected: :active
    end

    event :reject do
      transition active: :rejected
    end

    event :complete do
      transition active: :completed
    end

  end

end
