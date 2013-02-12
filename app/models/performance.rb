class Performance < ActiveRecord::Base
  attr_accessible :uuid

  has_many :viewers, :dependent => :delete_all
  has_many :sequences, :dependent => :delete_all

  validates :uuid, :presence => true, :format => { :with => /\A[-a-z0-9]{36,36}\Z/i }

  before_validation :generate_uuid

  def generate_uuid
    self.uuid = UUID.new.generate
  end
end

