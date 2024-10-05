---
layout: post
title: "[CA] Instruction Set 1"
date: 2024-09-16 12:00:00 +0900
categories: Computer_Architecture
use_math: true
---
# Instruction Set : Language of the Computer
<br>

**Instruction(명령어)**

컴퓨터 프로세서가 수행할 수 있는 기본적인 작업을 정의하는 기계어 코드.  
CPU 는 명령어에 따라 연산을 수행한다.  
  

## **Number Representation**

`10010010 00101100 11110011 00001000`

MSB : 가장 높은 자리의 bit 로 가장 왼쪽에 위치한다.  
LSB : 가장 낮은 자리의 bit 로 가장 오른쪽에 위치한다.  
<br>  

**Unsigned & Signed**

-   **Unsigned**는  **음수 없이 양수만**  표현할 때 사용된다.
-   32bits unsigned 정수는  **0부터 4,294,967,295**까지 표현할 수 있다.
-   `10010010 00101100 11110011 00001000`  =  **2452419336**  
      
    
-   **Signed**는  **양수와 음수를 모두**  표현한다.
-   MSB는  **부호 비트**로 사용된다.
    -   **0**이면 양수,  **1**이면 음수.
-   32bits signed 정수는  **-2,147,483,648부터 2,147,483,647**까지 표현할 수 있다.
-   `10010010 00101100 11110011 00001000`  =  **– 1842547960**  
<br> <br>       

**2’s complement (2의 보수)**

-   **음수를 표현하는 방법**  , 해당 양수의 bit를  **반전**한 후  **1을 더하여**  구한다.
-   `00010010 00101100`  = 4652
    1.  bit 반전 –>  `11101101 11010011`
    2.  1 더하기 –>  `11101101 11010100`  = –4652  
<br><br>       

----------
<br>     

## **Von-Neumann Model (폰 노이만 구조)**

<br>     
<img src="assets/img/Von Neumann.png" alt="Von Neumann" width="500"/>
<br><br>          

**폰 노이만(John von Neumann) 컴퓨터 구조**는 현대 컴퓨터 시스템의 기본적인 설계 원칙 중 하나로, 이 구조는 프로그램이 실행되는 방식을 정의하며, 대부분의 컴퓨터에서 사용된다.

1.  **단일 메모리 구조**
    -   **명령어(프로그램 코드)**와  **데이터**가 같은 메모리 공간에 저장된다.
    -   이것은 이전의 하버드 구조와는 다르게 프로그램과 데이터를 분리하지 않고, 동일한 메모리 공간을 공유하게 한다.
2.  **CPU(중앙 처리 장치)**
    -   CPU는  **명령어를 순차적으로 실행**하며, 이 과정에서 메모리에서 데이터를 가져와 처리하고, 처리 결과를 다시 메모리에 저장한다.
    -   폰 노이만 구조에서 CPU의 3가지 구성 요소:
        -   **Control Unit(제어 장치)**: 명령어를 해석하고 실행 순서를 제어
        -   **ALU(산술 논리 장치)**: 산술 연산과 논리 연산을 수행
        -   **Register(레지스터)**: CPU 내부에서 임시로 데이터를 저장, 연산 속도를 높이는 데 사용
3.  **순차적 명령어 처리**
    -   CPU는  **PC(프로그램 카운터)**에 따라 메모리에서 명령어를 순차적으로 읽어와 처리한다.
    -   명령어는  **Fetch**  →  **Interpret**  →  **Execute**의 3단계로 실행된다:
        - **Fetch (가져오기)**: 메모리에서 다음 실행할 명령어를 가져온다.
        - **Interpret (해석)**: 명령어를 해석하여 어떤 작업을 해야 할지 파악한다.
        - **Execute (실행)**: 해석된 명령어를 실제로 실행한다.

<br><br>     

<img src="assets/img/Von Neumann 2.png" alt="Von Neumann 2" width="500"/>
<br><br>   

1. **Data Path (데이터 경로)**
- CPU 내부에서 데이터가 이동하고 처리되는 경로.
- ALU, Register, Bus 와 같은 하드웨어 구성 요소로 구성.
- ALU에서 산술 및 논리 연산을 처리(Execute)하고, Register에서 데이터를 임시 저장하며, Bus를 통해 메모리와 데이터를 주고받는다.

2. **Control Unit (제어 장치)**
- 제어 장치는 CPU 내부에서 명령을 해석하고, 시스템의 다른 모든 구성 요소의 작동을 조정하는 장치.
- 메모리에 저장된 명령어를 순차적으로 가져와(Fetch), 이를 해석한 후(Decode), 데이터 경로에 필요한 동작을 지시. 
- 제어 장치는 CPU의 실행 흐름을 조절하는 중앙적인 역할을 하며, 데이터 경로와 메모리, 입출력 장치 등 모든 구성 요소를 제어한다. 

3. **Memory**
- 메모리는 프로그램이 실행되는 동안 명령어와 데이터를 저장하며, 제어 장치와 데이터 경로의 요청에 따라 데이터를 제공하거나 결과를 저장한다.


<br>

----------
<br>

## **Instruction Set (명령어 집합)**  
**Instruction Set**
- 컴퓨터가 이해하고 실행할 수 있는 명령어들의 집합. 일종의 컴퓨터용 사전.
- ex ) ARMv8, MIPS, x86, …

**Instruction Set Architecture**
- HW 와 SW 사이의 인터페이스를 정의한 일종의 스펙, 문서
- ISA ≠ CPU architecture


### Two types of ISA

**CISC (Complex Instruction Set Computing) -- x86**
- **복잡한 명령어**: 한 개의 명령어로 여러 작업을 처리할 수 있음.
- **변수 길이의 명령어**: 명령어 길이가 다양함.
- **메모리 접근 빈도 높음**: 명령어가 메모리를 많이 사용하여 데이터 처리.
- **마이크로프로그램 사용**: 복잡한 명령어들은 내부적으로 여러 하위 명령어로 나뉘어 실행됨.

- **장점**: 코드가 짧아지고 복잡한 작업을 한 번에 처리할 수 있음.
- **단점**: 명령어가 복잡해지고 실행 시간이 오래 걸리며, 하드웨어 구현이 복잡함.

**RISC (Reduced Instruction Set Computing) -- MIPS(&ARM)**
- **단순한 명령어**: 각 명령어는 단순한 작업을 빠르게 처리할 수 있음.
- **고정 길이의 명령어**: 명령어의 길이가 동일하여 처리 속도가 일정함.

- **장점**: 하드웨어가 단순하고 효율적이며, 명령어 처리 속도가 매우 빠름.
- **단점**: 더 많은 명령어가 필요할 수 있어 코드 길이가 길어질 수 있음.

<br>

-----

## Design Priciple
1. Simplicity favors regulariry 
: 모든 명령어가 3개의 operand 를 갖게 제한함으로써 하드웨어를 단순하게 함. 
2. Smaller is Faster
: 더 빠른 연산으로 위해 레지스터의 수가 32개로 제한됨.
3. Make the common case fast
: immediate operand, 상수 같이 자주 쓰는 값은 메모리 로드없이 즉시 사용. 


### Arithmetic Operation 

<br>
<img src="assets/img/Arithmetic Operation.png" alt="Arithmetic Operation" width="500"/>

<br>

### LEGv8 Registers (32 x 64-bit registers)

<br>
<img src="assets/img/LEGv8 Register.png" alt="LEGv8 Register" width="700"/>
<br><br>


## Register Operand Example

<br>
<img src="assets/img/Register Operand.png" alt="Register Operand" width="500"/>

-----

