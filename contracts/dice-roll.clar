;; Dice Roll - on-chain dice game
;; Users roll a die (1-6), result recorded on-chain with stats tracking

;; Global total rolls
(define-data-var total-rolls uint u0)

;; Per-user roll count
(define-map user-rolls principal uint)

;; Per-user last result
(define-map user-last-result principal uint)

;; Top 10 leaderboard storage
(define-data-var leader-1 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-2 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-3 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-4 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-5 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-6 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-7 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-8 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-9 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})
(define-data-var leader-10 {who: principal, rolls: uint} {who: tx-sender, rolls: u0})

;; Main roll function
(define-public (roll)
  (let
    (
      (caller tx-sender)
      (current (default-to u0 (map-get? user-rolls caller)))
      (new-count (+ current u1))
      (result (+ (mod (+ block-height new-count) u6) u1))
    )
    ;; Update user rolls
    (map-set user-rolls caller new-count)
    ;; Update last result
    (map-set user-last-result caller result)
    ;; Update global counter
    (var-set total-rolls (+ (var-get total-rolls) u1))
    ;; Update leaderboard
    (update-leaderboard caller new-count)
    (ok {rolls: new-count, result: result})
  )
)

;; Leaderboard update - bubble insert
(define-private (update-leaderboard (who principal) (rolls uint))
  (begin
    (if (>= rolls (get rolls (var-get leader-10)))
      (begin
        (var-set leader-10 {who: who, rolls: rolls})
        (bubble-up-9)
      )
      true
    )
    true
  )
)

(define-private (bubble-up-9)
  (if (>= (get rolls (var-get leader-10)) (get rolls (var-get leader-9)))
    (let ((tmp (var-get leader-9)))
      (var-set leader-9 (var-get leader-10))
      (var-set leader-10 tmp)
      (bubble-up-8)
    )
    true
  )
)

(define-private (bubble-up-8)
  (if (>= (get rolls (var-get leader-9)) (get rolls (var-get leader-8)))
    (let ((tmp (var-get leader-8)))
      (var-set leader-8 (var-get leader-9))
      (var-set leader-9 tmp)
      (bubble-up-7)
    )
    true
  )
)

(define-private (bubble-up-7)
  (if (>= (get rolls (var-get leader-8)) (get rolls (var-get leader-7)))
    (let ((tmp (var-get leader-7)))
      (var-set leader-7 (var-get leader-8))
      (var-set leader-8 tmp)
      (bubble-up-6)
    )
    true
  )
)

(define-private (bubble-up-6)
  (if (>= (get rolls (var-get leader-7)) (get rolls (var-get leader-6)))
    (let ((tmp (var-get leader-6)))
      (var-set leader-6 (var-get leader-7))
      (var-set leader-7 tmp)
      (bubble-up-5)
    )
    true
  )
)

(define-private (bubble-up-5)
  (if (>= (get rolls (var-get leader-6)) (get rolls (var-get leader-5)))
    (let ((tmp (var-get leader-5)))
      (var-set leader-5 (var-get leader-6))
      (var-set leader-6 tmp)
      (bubble-up-4)
    )
    true
  )
)

(define-private (bubble-up-4)
  (if (>= (get rolls (var-get leader-5)) (get rolls (var-get leader-4)))
    (let ((tmp (var-get leader-4)))
      (var-set leader-4 (var-get leader-5))
      (var-set leader-5 tmp)
      (bubble-up-3)
    )
    true
  )
)

(define-private (bubble-up-3)
  (if (>= (get rolls (var-get leader-4)) (get rolls (var-get leader-3)))
    (let ((tmp (var-get leader-3)))
      (var-set leader-3 (var-get leader-4))
      (var-set leader-4 tmp)
      (bubble-up-2)
    )
    true
  )
)

(define-private (bubble-up-2)
  (if (>= (get rolls (var-get leader-3)) (get rolls (var-get leader-2)))
    (let ((tmp (var-get leader-2)))
      (var-set leader-2 (var-get leader-3))
      (var-set leader-3 tmp)
      (bubble-up-1)
    )
    true
  )
)

(define-private (bubble-up-1)
  (if (>= (get rolls (var-get leader-2)) (get rolls (var-get leader-1)))
    (let ((tmp (var-get leader-1)))
      (var-set leader-1 (var-get leader-2))
      (var-set leader-2 tmp)
      true
    )
    true
  )
)

;; Read-only functions

(define-read-only (get-total-rolls)
  (var-get total-rolls)
)

(define-read-only (get-user-rolls (user principal))
  (default-to u0 (map-get? user-rolls user))
)

(define-read-only (get-user-last-result (user principal))
  (default-to u0 (map-get? user-last-result user))
)

(define-read-only (get-leaderboard)
  (list
    (var-get leader-1)
    (var-get leader-2)
    (var-get leader-3)
    (var-get leader-4)
    (var-get leader-5)
    (var-get leader-6)
    (var-get leader-7)
    (var-get leader-8)
    (var-get leader-9)
    (var-get leader-10)
  )
)
