module Workers
  class Badger < BaseWorker

    include Sidekiq::Worker

    queue :index_query
    retry_count configus.workers.retry_count.index

    def self.defer(params)
      perform_async(params)
    end

    def perform(options)
      # TODO 
    end

  end
end
