class Performance < ActiveRecord::Base
  MAX_VIEWERS = 6
  attr_accessible :uuid

  has_many :viewers, :dependent => :delete_all
  has_many :sequences, :dependent => :delete_all

  validates :uuid, :presence => true, :format => { :with => /\A[-a-z0-9]{36,36}\Z/i }

  scope :open_seat,
    joins("left join viewers on viewers.performance_id = performances.id").
    group('viewers.performance_id').
    having('count(viewers.performance_id) < ?', MAX_VIEWERS).
    order(:created_at).
    limit(1)


  before_validation :generate_uuid, :on => :create

  def generate_uuid
    self.uuid = UUID.new.generate
  end
end

