---
layout: post
title: "[CA] Instruction Set 2"
date: 2024-09-27 12:00:00 +0900
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

### Ex1. Compling If Statements.

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

### Ex2. Compling Loop Statements.

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