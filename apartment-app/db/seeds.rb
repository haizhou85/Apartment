# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

apartments = [
  {
    street: '1111 Boring Avenue',
    city: 'San Diego',
    zipcode: '92102',
    state: 'CA',
    country: 'United States'
  },
  {
    street: '2222 Faking Street',
    city: 'San Diego',
    zipcode: '92119',
    state: 'CA',
    country: 'United States'
  }
]


test = User.first

apartments.each do |att|
  test.apartments.create att
end
