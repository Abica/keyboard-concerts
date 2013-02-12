class Sequence < ActiveRecord::Base
  belongs_to :performance
  has_many :keys, :dependent => :delete_all
end

