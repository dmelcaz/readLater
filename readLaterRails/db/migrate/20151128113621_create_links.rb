class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :name
      t.string :url
      t.string :description
      t.boolean :read
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
