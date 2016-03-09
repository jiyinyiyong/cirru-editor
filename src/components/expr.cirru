
var
  hsl $ require :hsl
  React $ require :react
  Immutable $ require :immutable
  cx $ require :classnames

  Token $ React.createFactory $ require :./token
  div $ React.createFactory :div

  keydownCode $ require :../util/keydown-code
  detect $ require :../util/detect
  format $ require :../util/format

  bind $ \\ (v k) (k v)

= module.exports $ React.createClass $ object
  :displayName :cirru-expr

  :propTypes $ object
    :expr $ . (React.PropTypes.instanceOf Immutable.List) :isRequired
    :coord $ . (React.PropTypes.instanceOf Immutable.List) :isRequired
    :isLast React.PropTypes.bool.isRequired
    :isSimple React.PropTypes.bool.isRequired
    :dispatch React.PropTypes.func.isRequired
    :level React.PropTypes.number.isRequired

  :getInitialState $ \ () $ {}
    :isFolded false

  :onClick $ \ (event)
    event.stopPropagation
    @props.dispatch :focus-to @props.coord

  :onDoubleClick $ \ (event)
    event.stopPropagation
    if (not @state.isFolded) $ do
      @setState $ {} :isFolded true
    return

  :onUnfold $ \ (event)
    @setState $ {} :isFolded false

  :onKeyDown $ \ (event)
    switch event.keyCode
      keydownCode.cancel
        event.stopPropagation
        event.preventDefault
        @props.dispatch :remove-node @props.coord
      keydownCode.enter
        event.stopPropagation
        switch true
          event.shiftKey
            @props.dispatch :before-token @props.coord
          (or event.metaKey event.ctrlKey)
            @props.dispatch :prepend-token @props.coord
          else
            @props.dispatch :after-token @props.coord
      keydownCode.tab
        event.stopPropagation
        if event.shiftKey
          do
            @props.dispatch :unpack-expr @props.coord
          do
            @props.dispatch :pack-node @props.coord
      keydownCode.left
        event.stopPropagation
        @props.dispatch :go-left @props.coord
        event.preventDefault
      keydownCode.right
        event.stopPropagation
        @props.dispatch :go-right @props.coord
        event.preventDefault
      keydownCode.up
        event.stopPropagation
        @props.dispatch :go-up @props.coord
        event.preventDefault
      keydownCode.down
        event.stopPropagation
        @props.dispatch :go-down @props.coord
        event.preventDefault
    return

  :renderExpr $ \ ()
    var
      className $ cx $ object
        :cirru-expr true
        :is-last @props.isLast
        :is-simple @props.isSimple
        :is-empty $ is @props.expr.size 0
        :is-root $ is @props.coord.size 0

      makeList $ \\ (acc items index isLastSimple)
        cond (is items.size 0) acc
          bind (items.first) $ \\ (item)
            cond (is (typeof item) :string)
              makeList
                acc.push $ Token $ {} (:token item) (:key index)
                  :coord $ @props.coord.push index
                  :dispatch @props.dispatch
                  :isHead (is index 0)
                items.rest
                + index 1
                , true
              bind
                and isLastSimple
                  detect.isSimple item
                  > @props.level 0
                  < index 3
                  isnt index (- @props.expr.size 1)
                \\ (isSimple)
                  makeList
                    acc.push $ Expr $ {} (:expr item) (:key index)
                      :coord $ @props.coord.push index
                      :dispatch @props.dispatch
                      :isLast $ and
                        is index (- @props.expr.size 1)
                        > @props.level 0
                      :isSimple isSimple
                      :level $ + @props.level 1
                    items.rest
                    + index 1
                    , isSimple

    div
      {} (:className className) (:onClick @onClick)
        :onDoubleClick @onDoubleClick
        :id $ ... @props.coord (unshift :leaf) (join :-)
        :tabIndex 0
        :onKeyDown @onKeyDown
        :ref :root
      makeList (Immutable.List) @props.expr 0 true

  :renderFolded $ \ ()
    div
      {} :onClick @onUnfold :onDoubleClick @onDoubleClick
        , :tabIndex null :key :unfocused
        , :style @styleFolded
      format.plain @props.expr

  :render $ \ ()
    cond @state.isFolded
      @renderFolded
      @renderExpr

  :styleFolded $ {}
    :color :white
    :WebkitUserSelect :none
    :whiteSpace :nowrap
    :fontFamily ":Menlo, Consolas, monospace"
    :fontSize 12
    :color $ hsl 0 0 50
    :padding ":0 4px"
    :lineHeight :24px
    :maxWidth 400
    :overflow :hidden
    :textOverflow :ellipsis
    :margin ":2px 0"
    :cursor :pointer
    :borderRadius 4
    :border $ + ":1px solid " (hsl 0 0 50)

var Expr $ React.createFactory module.exports
