---
layout: post
title: "RSA for the Curious"
lang: en
---

# RSA for the Curious 

When researching encryption algorithms, we often come across the famous *Rivest-Shamir-Adleman Algorithm*, or simply RSA. But what exactly is it, how does it work, and what guarantees do we have that it's actually secure? These are the questions I intend to dissect in this article.  

Before proceeding, I truly recommend reading this: [Diffie-Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange). It clarifies some concepts that may arise throughout this text, such as how symmetric and asymmetric keys work.  

With that said, let's move on to some necessary explanations that lay the groundwork before diving into the algorithm itself. These explanations will help clarify the processes involved in encrypting any given content.  

## The Fundamental Theorem of Arithmetic  

The **Fundamental Theorem of Arithmetic** states that:  

If **n** is a natural number where **n > 1**, then there exist prime numbers **p₁, p₂, p₃, ..., pᵣ**, with **r ≥ 1**, such that:  
**n = p₁ × p₂ × p₃ × ... × pᵣ**.  

Apart from the order of the prime factors, this factorization is unique. Let’s break it down:  

Given any number **x**, we want to prove that **x** can be factored into prime numbers. We’ll use an inductive approach:  
- Starting with **x = 2**, we see that it has a prime factorization since it is itself a prime number. We call this the **trivial factorization**.  
- If **x > 2** and is also prime, it admits the trivial factorization just like 2. Otherwise, **x** has some positive divisor **d**, such that **x = d × q**. Similarly, if **d** or **q** are prime, they also admit trivial factorization.  

Once we have proven the existence of prime factorization, we must show that it is unique.  

Let's assume that **x** can be factored in two different ways:  
**x = p₁ × p₂ × ... × pₖ = q₁ × q₂ × ... × qₛ**.  

Since both factorizations are valid and arranged in ascending order, we conclude that **p₁ = q₁**. Canceling these from both sides, we get:  
**p₂ × ... × pₖ = q₂ × ... × qₛ**.  

By induction, we prove that the factorization is unique for any natural number.  

## Prime Numbers  

A **prime number** is defined as any natural number greater than 1 that is divisible only by 1 and itself.  

We can eliminate some numbers using basic divisibility rules:  
- **Divisibility by 2:** All even numbers (ending in 0, 2, 4, 6, or 8) are divisible by 2.  
- **Divisibility by 3:** A number is divisible by 3 if the sum of its digits is also divisible by 3.  
- **Divisibility by 4:** A number is divisible by 4 if its last two digits form a number that is divisible by 4.  
- **Divisibility by 5:** Numbers ending in 0 or 5 are divisible by 5.  
- **Divisibility by 6:** A number is divisible by 6 if it is both even and divisible by 3.  
- **Divisibility by 7:** A number is divisible by 7 if twice the last digit, subtracted from the rest of the number, results in a multiple of 7.  

Using these rules, we can determine all prime numbers below 100:  

![Prime Numbers](https://s1.static.brasilescola.uol.com.br/img/2015/11/numeros-primos-.jpg)  

The numbers highlighted in yellow are prime since they do not fit any of the divisibility rules above.  

## Modular Arithmetic and Congruences  

A **congruence** is a relationship between two numbers that, when divided by a third number (the modulus), leave the same remainder.  

For example, **32 is congruent to 8 modulo 12**, since:  
**32 = 2 × 12 + 8** and **8 = 0 × 12 + 8**.  

In general, for integers **a** and **b**, and a positive integer **m**, we write:  
**a ≡ b (mod m)** if and only if **a mod m = b mod m**.  

Example:  
**379 ≡ 3 (mod 8)**  

## The RSA Encryption Algorithm  

The RSA algorithm is an asymmetric encryption method based on the mathematics of prime numbers. Here's how it works:  

1. Choose two distinct prime numbers **p** and **q**.  
2. Define **N = p × q** and **φ(N) = (p - 1) × (q - 1)**.  
3. Choose a number **e**, which is part of the public key, such that **GCD(e, φ(N)) = 1**, and **1 < e < φ(N)**.  
4. Solve the congruence **e × d ≡ 1 (mod φ(N))** to find **d**, which is part of the private key.  
5. Convert the message into numbers using a pre-defined table (e.g., ASCII), then break it into blocks **b**, ensuring **1 ≤ b < N**.  
6. Encrypt each block using the public key **(e, N)**:  
   **C(b) = b^e mod N** (this is the encrypted message).  
7. Decrypt using the private key **(d, N)**:  
   **D(C(b)) = C(b)^d mod N**, ensuring **1 ≤ D(C(b)) < N**.  
8. Convert the decrypted numbers back into characters using the same table from step 5.  

Let's see an example for **φ(697)**:  

**φ(N) = (17 - 1) × (41 - 1) = 640**  
Choosing **e = 13**, since **GCD(640, 13) = 1**, our public key is **(697, 13)**.  

For the word **"TURING"**, we compute:  
- **T = 19^13 mod 697**  
- **U = 20^13 mod 697**  
- **R = 17^13 mod 697**  
- **I = 09^13 mod 697**  
- **N = 13^13 mod 697**  
- **G = 07^13 mod 697**  

This results in:  
`15 692 391 501 421 176`  

## Why Does This Method Work?  

Since **(b^e)^d ≡ b mod N**, the decrypted message is guaranteed to match the original message. This follows from number theory principles, particularly Euler's theorem and Fermat’s little theorem.  

## Why Is It "safe"?  

To break the encryption, one must determine the private key **(d, N)**. The public key **(e, N)** already provides **N**, so an attacker needs to find **d**.  

Since **N = p × q**, an attacker would need to factorize **N** to determine **p** and **q**. However, factoring large integers is computationally infeasible with current technology.  

For example, with a **256-bit key** (**k = 2²⁵⁶**), a supercomputer performing **33.86 petaflops (quadrillions of operations per second)** would still take:  

**2²⁵⁶ / (33.86 × 2⁵⁰) × 365 × 24 × 60 × 60 ≈ 9.63 × 10⁵² years**  

Now imagine the complexity for a **4096-bit key**!  

## References  

- [RSA Cryptography, by Daniele Helena Bonfim](https://upload.wikimedia.org/wikipedia/commons/1/1b/ASCII-Table-wide.svg)  
- [A Guide for Teachers – RSA Encryption](https://www.amsi.org.au/teacher_modules/pdfs/Maths_delivers/Encryption5.pdf)  
- [Fundamental Theorem of Arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic)  
- [Introduction to Modular Arithmetic](https://www.cin.ufpe.br/~gdcc/matdis/aulas/aritmeticaModular.pdf)  