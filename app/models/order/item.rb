class Order::Item < ActiveRecord::Base
  belongs_to :order

  serialize :params

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
