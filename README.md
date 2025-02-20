# Firebase Increment Counter Race Condition

This repository demonstrates a race condition in a Firebase function designed to increment a counter.  The function correctly handles existing documents, but fails when the document does not initially exist due to multiple reads before writes. The solution illustrates how to handle this edge case to ensure reliable counter increments.

## Bug

The `incrementCounter` function uses `docRef.get()` to retrieve the current counter value before updating it.  If the document doesn't exist, the function throws an error because of the `doc.data().counter`. If multiple calls to this function happen simultaneously before the document is created, they all will read a non-existent document and fail to create it. This leads to inconsistent counter values.

## Solution

The solution uses a transaction to atomically check for the document's existence and update the counter. This guarantees that the increment operation is performed reliably, without race conditions.