module Workers
  class Badger < BaseWorker

    include Sidekiq::Worker

    queue :badge_query

    def self.defer(params)
      perform_async(params)
    end

    def perform(params)
      ::Parser.make_svg(params['svg'], params['options'])
    end

  end
end
