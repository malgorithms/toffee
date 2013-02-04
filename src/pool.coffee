class Pool
  constructor: (cons, size) ->
    @_consfn = cons
    @_size = size
    @_pool = []

  get: () ->
    if @_pool.length > 0
      @_pool.pop()
    else
      @_consfn()

  release: (x) ->
    if @_pool.length < @_size
      @_pool.push x

exports.Pool = Pool
