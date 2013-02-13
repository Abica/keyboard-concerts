class Performance < ActiveRecord::Base
  MAX_VIEWERS = 6
  attr_accessible :uuid

  has_many :viewers, :dependent => :delete_all
  has_one :sequence, :dependent => :delete

  validates :uuid, :presence => true, :format => { :with => /\A[-a-z0-9]{36,36}\Z/i }

  before_validation :generate_uuid, :on => :create
  after_create :generate_sequence

  private
  def generate_uuid
    self.uuid = UUID.new.generate
  end

  def generate_sequence
    create_sequence
  end
end

