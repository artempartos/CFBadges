module Workers
  class BaseWorker

    def self.queue(name = nil)
      sidekiq_options(queue: name) if name
      @queue ||= name
    end

    def self.retry_count(count = nil)
      sidekiq_options(retry: count) if count
      @retry_count ||= count
    end

  end
end
