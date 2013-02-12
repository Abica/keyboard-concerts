class Viewer < ActiveRecord::Base
  attr_accessible :rating

  validates :rating,
    :presence => true,
    :inclusion => { :in => 1..5 },
    :numericality => true
end

