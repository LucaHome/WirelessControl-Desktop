# TODO

- [x] Store data
- [x] Display content
  - [x] login possibility
  - [x] areas
  - [x] wireless sockets
  - [x] periodic tasks
  - [x] settings
    - [x] change credentials => Logout-Button
    - [x] change theme
      - [x] change theme on the fly => CANCELED
  - [x] display filter for wireless sockets and periodic tasks
    - [x] wireless sockets
    - [x] periodic tasks
- [x] Load content (use actions)
  - [x] credentials
  - [x] areas
  - [x] wireless sockets
  - [x] periodic tasks
- [x] Add, Update, Delete entries
  - [x] areas
  - [x] wireless sockets
  - [x] periodic tasks
- [x] Navigating
- [x] Bugs
  - [x] 302 error loading areas, wireless sockets or periodic tasks after successful login
  - [x] error adding new wireless socket using handleAdd throws null exception in .some ...
  - [x] error adding new periodic task using handleAdd throws null exception in .some ...
  - [x] fix deletion bug in reducers
  - [x] fix layout in periodic tasks if nothing selected
  - [x] fix submit bug
  - [x] after adding new periodic task or wireless socket select used wireless socket or area
  - [x] fix add/put & update/post bug
  - [x] fix state bug in switch view
- [x] unifying
  - [x] styles
  - [x] method duplications => more generic
  - [x] props for area, periodic task & wireless socket
  - [x] remove duplicate html creation
- [x] remove bootstrap and reactstrap
- [x] reload button (y) or automatic reload
- [x] [create executable](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md)
  - [x] use [electron-packager](https://github.com/electron-userland/electron-packager)
- [ ] Fix Electron build problem --> stuck and not doing anything after starting build #3
