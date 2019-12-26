## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|text |text|
|image|string|

### Association
belong_to:user
has_many:comments
has_many:groups_users
has_many:users,through:groups_users


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|pass|string|null: false|
|name|string|null: false|

### Association
has_many:groups_users
has_many:groups,through:groups_users


## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|

### Association
belongs_to:user
belongs_to:group