---
layout: post
title: "RSA for the Curious"
lang: en
order: 1
category: Cryptography
description: "Prime numbers, public keys, and the mathematics behind a secret."
---

When researching encryption algorithms, we often come across RSA, named after Rivest, Shamir, and Adleman. What does it do, how does it work, and where does its security come from? Let's work through the mathematics with a small example.

A little background on [Diffie–Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) helps distinguish shared secrets from public and private keys. RSA uses a different construction, but the question is similar: how can two people communicate without first sharing a secret key?

## The Fundamental Theorem of Arithmetic

The **fundamental theorem of arithmetic** states that every integer greater than one has a prime factorization that is unique up to the order of its factors.

```text
n = p₁ × p₂ × … × pᵣ
```

For existence, consider an integer `n > 1`:

- If `n` is prime, its factorization consists of `n` itself.
- If `n` is composite, write it as a product of smaller integers and continue factoring those integers. The process eventually reaches prime factors.

For uniqueness, suppose the same integer has two prime factorizations:

```text
p₁ × p₂ × … × pₖ = q₁ × q₂ × … × qₛ
```

By Euclid's lemma, `p₁` must divide one of the primes on the right, so those two primes are equal. Cancel them and repeat. Both lists must contain the same prime factors, with the same multiplicities.

## Prime Numbers

A **prime number** is an integer greater than one whose only positive divisors are one and itself.

Some useful divisibility checks:

- **2:** the last digit is even.
- **3:** the sum of the digits is divisible by three.
- **4:** the final two digits form a number divisible by four.
- **5:** the last digit is zero or five.
- **6:** the number is divisible by both two and three.
- **7:** subtract twice the final digit from the remaining number; the original is divisible by seven exactly when that result is.

These checks help eliminate composite numbers. To test an integer, it is sufficient to check prime divisors up to its square root.

![A sieve highlighting the prime numbers below 100]({{ '/assets/images/rsa/skey-img4.png' | relative_url }}){: .prime-sieve}

The highlighted numbers are the primes below 100.

## Modular Arithmetic and Congruences

Two integers are **congruent modulo `m`** when division by `m` leaves the same remainder.

```text
32 = 2 × 12 + 8
 8 = 0 × 12 + 8

32 ≡ 8 (mod 12)
```

More generally, for integers `a` and `b` and a positive modulus `m`:

```text
a ≡ b (mod m)  ⇔  a mod m = b mod m

379 ≡ 3 (mod 8)
```

The modulus gives us a finite space in which to perform arithmetic. RSA relies on exponentiation inside that space.

## The RSA Encryption Algorithm

For this textbook example, choose two distinct primes, `p` and `q`, and use their product as the modulus.

1. Compute `N = p × q`.
2. Compute `φ(N) = (p − 1) × (q − 1)`.
3. Choose a public exponent `e` with `1 < e < φ(N)` and `gcd(e, φ(N)) = 1`.
4. Find the private exponent `d`, the multiplicative inverse of `e` modulo `φ(N)`.
5. Represent a message as integers `m` with `0 ≤ m < N`.
6. Encrypt each integer with the public key `(N, e)`.
7. Decrypt with the private key `(N, d)`.

```text
e × d ≡ 1 (mod φ(N))

Encryption: c = mᵉ mod N
Decryption: m = cᵈ mod N
```

### A Small Worked Example

Take `p = 17` and `q = 41`:

```text
N    = 17 × 41 = 697
φ(N) = 16 × 40 = 640

e = 13
d = 197

13 × 197 = 2561 = 4 × 640 + 1
```

The public key is `(697, 13)`; the private key is `(697, 197)`.

For the word **TURING**, use the simple mapping `A = 0, B = 1, …, Z = 25`. This is an illustration, not ASCII encoding.

| Letter | Plaintext `m` | Ciphertext `m¹³ mod 697` |
| :----- | -----------: | ----------------------: |
| T | 19 | 15 |
| U | 20 | 692 |
| R | 17 | 391 |
| I | 8 | 349 |
| N | 13 | 421 |
| G | 6 | 639 |

```text
Plaintext:  19  20   17    8   13    6
Ciphertext: 15  692  391  349  421  639
```

You can verify both directions with Python:

```python
modulus = 17 * 41
public_exponent = 13
private_exponent = pow(public_exponent, -1, 16 * 40)

message = "TURING"
plaintext = [ord(letter) - ord("A") for letter in message]
ciphertext = [pow(value, public_exponent, modulus) for value in plaintext]
recovered = [pow(value, private_exponent, modulus) for value in ciphertext]

assert recovered == plaintext
print(ciphertext)  # [15, 692, 391, 349, 421, 639]
print("".join(chr(value + ord("A")) for value in recovered))  # TURING
```

## Why Does This Method Work?

The exponents were chosen so that `e × d = 1 + k × φ(N)` for some integer `k`. For messages coprime to `N`, Euler's theorem gives:

```text
mᵉᵈ ≡ m × (m^φ(N))ᵏ ≡ m (mod N)
```

The Chinese remainder theorem extends the argument to every message representative in the range `0 ≤ m < N`, including those divisible by `p` or `q`.

## What Makes RSA Hard to Break?
{: #why-is-it-safe}

Factoring `N` into `p` and `q` lets us compute `φ(N)` and then recover `d`. Multiplying large primes is straightforward; reversing that multiplication becomes difficult as the modulus grows.

The number of possible bit strings is not a direct estimate of the work needed to factor an RSA modulus. A `256-bit` RSA modulus does not provide `256-bit` security, and the small numbers above are only useful for explaining the arithmetic.

Textbook RSA also preserves patterns: the same message representative produces the same ciphertext. Real encryption schemes add randomized encoding, such as RSAES-OAEP, described in [RFC 8017](https://www.rfc-editor.org/rfc/rfc8017.html#section-7.1).

## References

- [RSA cryptography specifications — RFC 8017](https://www.rfc-editor.org/rfc/rfc8017.html)
- [A guide for teachers — RSA encryption](https://www.amsi.org.au/teacher_modules/pdfs/Maths_delivers/Encryption5.pdf)
- [Fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic)
- [Introduction to modular arithmetic](https://www.cin.ufpe.br/~gdcc/matdis/aulas/aritmeticaModular.pdf)
