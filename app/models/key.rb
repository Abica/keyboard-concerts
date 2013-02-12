class Key < ActiveRecord::Base
  belongs_to :sequence

  attr_accessible :key

  validates :key,  :presence => true, :numericality => true
end

