## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|

### Association
has_many:comments
has_many:groups_users
has_many:users,through:groups_users


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|

### Association
has_many:groups_users
has_many:groups,through:groups_users
has_many:comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|
|image|string|
|text|text|

### Association
belongs_to:user
belongs_to:group