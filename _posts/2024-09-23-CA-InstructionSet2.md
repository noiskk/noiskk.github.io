---
layout: post
title: "[CA] Instruction Set 2"
date: 2024-09-23 12:00:00 +0900
categories: Computer_Architecture
---
# Arithmetic instructions (연산 명령어)
<br>
  
## **LEGv8 Instruction**

### 1. **Arithmetic(산술) instructions**

- **R-type** 

  <img src="assets/img/R-type.png" alt="R-type" width="500"/>

  - **ADD(SUB)**: 두 레지스터 값을 더하거나 뺌. 
  ```
  ADD Xd, Xn, Xm
  SUB Xd, Xn, Xm
  ```
  - `Xd`: 목적 레지스터 (결과 저장)
  - `Xn`: 첫 번째 소스 레지스터
  - `Xm`: 두 번째 소스 레지스터

- **I-type** 

  <img src="assets/img/I-type.png" alt="I-type" width="500"/>

  - **ADDI(SUBI)**: 레지스터 값과 상수 값을 더하거나 뺌.
  ```
  ADDI Xd, Xn, #m (ADDI X1, X2, #5)
  SUBI Xd, Xn, #m
  ```
  - `Xd`: 목적 레지스터 (결과 저장)
  - `Xn`: 레지스터
  - `#m`: 상수 값

### 2. **Data transfer(load and store) instructions**

- **D-type** 

  <img src="assets/img/D-type.png" alt="D-type" width="500"/>

  - **LDUR (Load Register)**: 메모리에서 데이터를 레지스터로 로드
  ```
  LDUR Xt, [Xn, #offset]
  ```
    - `Xt`: 목적 레지스터 (로드된 값이 저장될 곳)
    - `Xn`: 베이스 레지스터 (메모리 주소 계산에 사용)
    - `offset`: 메모리 주소를 계산할 때 추가될 값

  - **STUR (Store Register)**: 레지스터의 데이터를 메모리로 저장
  ```
  STUR Xt, [Xn, #offset]
  ```
    - `Xt`: 소스 레지스터 (저장할 데이터가 있는 곳)
    - `Xn`: 베이스 레지스터
    - `offset`: 메모리 주소 오프셋

### 3. **Branch instructions**

- **B-type** 
  - **B (Branch)**: 무조건 분기
  ```
  B label
  ```
    - `label`: 분기할 대상 위치

  - **CBZ (Compare and Branch if Zero)**: 레지스터 값이 0이면 분기
    ```
    CBZ Xn, label
    ```
  
  - **CBNZ (Compare and Branch if Not Zero)**: 레지스터 값이 0이 아니면 분기
    ```
    CBNZ Xn, label
    ```


### 4. **Logical(Shift) instructions**

- **LSL (Logical Shift Left)**: 레지스터 값을 왼쪽으로 시프트
  ```
  LSL Xd, Xn, #shift_amount
  ```

- **LSR (Logical Shift Right)**: 레지스터 값을 오른쪽으로 시프트
  ```
  LSR Xd, Xn, #shift_amount
  ```

- **AND (ANDI)**: 두 레지스터의 비트 단위 AND 연산
  ```
  AND Xd, Xn, Xm
  ANDI Xd, Xn, Xm
  ```

- **ORR (ORRI)**: 두 레지스터의 비트 단위 OR 연산
  ```
  ORR Xd, Xn, Xm
  ORRI Xd, Xn, Xm
  ```

- **EOR (Exclusive OR, EORI)**: 두 레지스터의 비트 단위 XOR 연산
  ```
  EOR Xd, Xn, Xm
  EORI Xd, Xn, Xm
  ```

<br>

----
<br>

### Ex. Compling If Statements.

```
C code:
if (i==j)
  f = g + h;
else
  f = g - h;

(f, g, h, i, j in X19, X20, X21, X22, X23)

Complied LEGv8 code:
      SUB X9, X22, X23
      CBNZ X9, Else
      ADD X19, X20, X21
      B Exit
Else: SUB X19, X20, X21
Exit: ...
```

### Ex. Compling Loop Statements.

```
C code:
while (save[i]==k) i += 1;

(i, k, save in X22, X24, X25)

Complied LEGv8 code:
Loop: LSL X10, X22, #3
      ADD X10, X10, X25
      LDUR X9, [X10, #0]
      SUB X11, X11, X24
      CBNZ X11, Exit
      ADDI X22, X22, #1
      B Loop
Exit: ...
```
----

<br>

### More Conditional Operatoins


**Flags (조건 코드)**

S-suffix
: S가 붙어있는 산술 명령어 ( ex. ADDS, ADDIS, ANDS ...) 는 명령어 수행 중 발생한 상황을 기록한다. <br>기록된 상황은 CC Test 에 사용되고 상황은 다음과 같다. 
- negative(N) : 결과의 MSB 가 1 (음수)
- zero (Z) : 결과가 0
- overflow (V) : 결과가 범위를 초과
- carry (C) : 결과가 MSB 에서 carryout 발생


SUBS(빼기) 연산을 사용해 flags 를 설정한 후 조건부 분기를 수행한다. 

- B.EQ: 같을 때
- B.NE: 다를 때
- B.LT: 작을 때(부호 있는)
- B.LO: 작을 때(부호 없는)
- B.LE: 작거나 같을 때(부호 있는)
- B.LS: 작거나 같을 때(부호 없는)
- B.GT: 클 때(부호 있는)
- B.HI: 클 때(부호 없는)
- B.GE: 크거나 같을 때(부호 있는)
- B.HS: 크거나 같을 때(부호 없는)

### Ex. if statement

```
C code:
if (a > b) a += 1;

(a, b in X22, X23)

Complied LEGv8 code:
      SUBS X9, X22, X23
      B.LE Exit
      ADDI X22, X22, #1
Exit: ...
```
-----
<br>

### Procedure Calling (함수 호출)

**Procedure Call:** branch and link
: BL ProcedureLabel

**Procedure Return:** branch and register
: BR LR <br>
여기서 LR 은 link register (return address) 를 말함. <br>
X28 : stack pointer (SP)<br>
X29 : frame pointer (FP)<br>
X30 : link register (LR)<br>


### Ex. Leaf Procedure

```
C code:
long long int leaf_example (long long int g, long
long int h, long long int i, long long int j)
{
long long int f;
f = (g + h) - (i + j);
return f;
}

g, h, i, j in X0, X1, X2, X3
f in X19 (hence, need to save it on stack)
We will use two temporary registers: X9, X10 (need to save them
on stack)


Complied LEGv8 code:
leaf_example:
SUBI SP,SP,#24      // Save X10, X9, X19 on stack
STUR X10,[SP,#16]
STUR X9,[SP,#8]
STUR X19,[SP,#0]
ADD X9,X0,X1        // X9 = g + h
ADD X10,X2,X3       // X10 = i + j
SUB X19,X9,X10      // f = X9 - X10
ADD X0,X19,XZR      // copy f to return register
LDUR X10,[SP,#16]   // Restore X10, X9, X19 from stack
LDUR X9,[SP,#8]
LDUR X19,[SP,#0]
ADDI SP,SP,#24
BR LR               // Return to caller
```

<br>

### Non-Leaf Procedures

```
C code:
int fact (int n)
{
if (n < 1) return (1);
else return n * fact(n - 1);
}

n in X0
Result in X1


Complied LEGv8 code:
fact:
  SUBI SP,SP,#16      // Save return address and n on stack
  STUR LR,[SP,#8]
  STUR X0,[SP,#0]
  SUBIS XZR,X0,#1     // compare n and 1
  B.GE L1             // if n >= 1, go to L1
  ADDI X1,XZR,#1      // Else, set return value to 1
  ADDI SP,SP,#16      // Pop stack, don’t bother restoring values
  BR LR               // Return
L1: SUBI X0,X0,#1     // n = n - 1
  BL fact             // call fact(n-1)
  LDUR X0,[SP,#0]     // Restore caller’s n
  LDUR LR,[SP,#8]     // Restore caller’s return address
  ADDI SP,SP,#16      // Pop stack
  MUL X1,X0,X1        // return n * fact(n-1)
  BR LR               // return
```


------

### Ex. String Copy

```
C code:
void strcpy (char x[], char y[]) {
size_t i;
i = 0;
while ((x[i]=y[i])!='\0')
i += 1;
}

(array x, array y, i in X0, X1, X19)

Complied LEGv8 code:
strcpy:
    SUBI SP,SP,8        // push X19
    STUR X19,[SP,#0]
    ADD X19,XZR,XZR     // i=0
L1: ADD X10,X19,X1      // X10 = addr of y[i]
    LDURB X11,[X10,#0]  // X11 = y[i]
    ADD X12,X19,X0      // X12 = addr of x[i]
    STURB X11,[X12,#0]  // x[i] = y[i]
    CBZ X11,L2          // if y[i] == 0 then exit
    ADDI X19,X19,#1     // i = i + 1
    B L1                // next iteration of loop
L2: LDUR X19,[SP,#0]    // restore saved X19
    ADDI SP,SP,8        // pop 1 item from stack
    BR LR               // and return
```

<br>

### Synchronization

Race condition
: 두 개 이상의 프로세서가 같은 데이터를 동시에 수정하려고 할 때 발생하는 문제. <br> 동기화를 통해 HW 적으로 이를 해결할 수 있음. 

Synchronization (동기화)
: 하나의 프로세서만 데이터를 수정하거나 읽을 수 있게 잠깐 "잠금"을 걸어두는 개념. 

- **LDXR**: 메모리에서 레지스터로 값을 로드할 때 그 주소를 잠금함. 
  ```
  LDXR Xd, [Xn, #n]
  LDXR X10, [X20, #0]
  ```

- **STXR**: 데이터 충돌을 확인하고 잠금을 해제. 
  ```
  STXR Xd, Xn, [Xn]
  STXR X23, X9, [X20]
  ```

Ex1. atomic swap
  ```
  register X23 <--> memory X20 (swap)

  again: LDXR X10, [X20, #0]
         STXR X23, X9, [X20] // X9 = status
         CBNZ X9, again
         ADD X23, XZR, X10   // X23 = loaded value
  ```

Ex2. lock / unlock
  ```
         ADDI X11, XZR, #1    // copy locked value; X11 = 1
  again: LDXR X10, [X20, #0]  // read lock
         CBNZ X10, again      // check if it is 0 yet
         STXR X11, X9, [X20]  // attempt to store
         BNEZ X9, again       // branch if fails
  Unlock:
         STUR XZR, [X20, #0]  // free lock (=unlock)
  ```