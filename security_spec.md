# Security Specification - Harsh Yadav Advisory

## Data Invariants
1. A quote must have a valid email and phone number.
2. A message must have a content body.
3. Blog posts can only be created by the administrator (Harsh Yadav).
4. Clients can create quotes and messages but cannot read others' data.

## The "Dirty Dozen" Payloads (Denial Tests)
1. Creating a quote without a phone number.
2. Creating a quote with a 1MB string in the name field.
3. Updating a message's content after creation.
4. Deleting a blog post as an unauthenticated user.
5. Creating a blog post with a spoofed author field.
6. Reading the list of all messages as an unauthenticated user.
7. Injecting extra fields (like `isProcessed: true`) into a quote creation.
8. Updating the `createdAt` timestamp of a message.
9. Creating a quote with an invalid `insuranceType`.
10. Reading a specific quote document by its ID without being the owner (if ownership was tracked, but here we favor admin-only reads for simplicity/privacy).
11. Attempting to list all quotes via the client SDK.
12. Creating a message with a spoofed `email_verified` status in a hypothetical auth-checked create (though we allow anonymous creation for contacts).

## Security Logic Plan
- `quotes`: `allow create: if isValidQuote(incoming())`. No `list` or `get` for public.
- `messages`: `allow create: if isValidMessage(incoming())`. No `list` or `get` for public.
- `blogPosts`: `allow read: if true`. `allow write: if isAdmin()`.

## Admin Concept
Admin is identified by the user email: `harshyadav02201@gmail.com`.
