# Rest API Booking room

## User Role

1. Admin
2. Guest

## Admin Access

1. login url = https://rest-api-pendaftaran-room-m.herokuapp.com/auth/login (email : admin@gmail.com, password : 12345)
2. tambah ruangan, url = https://rest-api-pendaftaran-room-m.herokuapp.com/rooms/addOne (room_name : value, room_capacity : value)
3. lihat ruangan, url = https://rest-api-pendaftaran-room-m.herokuapp.com/rooms/viewsAdmins (header->x-access-token : value)

## Guest Access

1. register, url = https://rest-api-pendaftaran-room-m.herokuapp.com/auth/register (email : value, password : value)
2. login, url = https://rest-api-pendaftaran-room-m.herokuapp.com/auth/login (email : value, password : value)
3. booking ruangan, url = https://rest-api-pendaftaran-room-m.herokuapp.com/auth/login (user_id : value, room_id : value, total_person : value, booking_time : value, noted : value, check_in_time : value, check_out_time : value)
4. lihat ruangan, url = https://rest-api-pendaftaran-room-m.herokuapp.com/viewsGuest

## Bugs

1. upload image ruangan
2. upload image profile Guest
3. auto send email ketika hari pemesanan ruangan tiba
