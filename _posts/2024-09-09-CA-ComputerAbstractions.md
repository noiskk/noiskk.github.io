---
layout: post
title: "[CA] Computer Abstractions and Technology"
date: 2024-09-09 12:00:00 +0900
categories: Computer_Architecture
---
## *Computer Abstractions and Technology*
-------
<br>

기술에 발전에 따라 컴퓨터의 크기는 점점 작아지는 반면, 용량과 성능은 점점 증가하고 있다. <br><br>

Moore's Law 무어의 법칙
: 컴퓨터의 용량(성능 X)은 18~24개월마다 2배씩 증가한다는 법칙 <br><br>

**Class of Computers 컴퓨터의 종류**

- **Desktop(personal) computers** = PC
- **Server computers** <br>
더 큰 용량 <br>
신뢰성(reliability)이 중요
- **Internet datacenters** <br>
서버 컴퓨터의 클러스터 묶음
- **Embedded computers** <br>
비행기, 자동차 등 하드웨어에 탑재된 컴퓨터

<br>
**🔥 5 Components of a Computer 🔥**
: Input, Output, Memory, Datapath, Control
<br><br>

----------
## **Memory**
데이터를 저장하는 곳<br> 현재 실행되고 있는 프로그램이 메모리로 올라온다. <br>

**DRAM** (**D**ynamic **R**andom **A**ccess **M**emory)<br>
Random access : 칩이 어디에 있든, 어느 용량이든 동일한 응답 속도를 보장해줌 <br>
반면 HDD는 위치에 따라 시간이 차이날 수 있음 (Sequential access)<br><br>

**저장장치의 종류**

|       |    주기억장치   |   |    보조기억장치 | 
|-------------------|----------------|--------------|----------------------------|-------------------------|
| **종류**        | RAM            | ROM        | HDD      | SSD |플래시 메모리 |
|**휘발성**          |   휘발성       | 비휘발성     | 비휘발성         | 비휘발성   | 비휘발성|
| **특징**        |  랜덤 액세스 <br> (모든 데이터가 동일한 시간에 접근 가능) |읽기 전용| 회전하는 자기 디스크 사용<br> (데이터 간 속도 차이)<br> 대용량 저장 가능 <br> 느린 속도 | 플래시 메모리 사용<br> 빠른 속도 제공 <br> HD보다 비쌈 |전자기기를 통해 데이터 기록 및 삭제 가능 |
|   **용도**         | 운영체제,<br> 실행 중인 프로그램,<br> 현재 작업 데이터의 임시 저장 | 시스템 부팅 <br>(BIOS 같은 펌웨어 저장)| 백업 장치<br> 저비용 데이터 서버 | 운영체제 저장<br> 애플리케이션 실행<br> 데이터베이스 및 서버  | USB 드라이브<br> SD 카드<br> SSD  |


<br>

**메모리 및 저장 장치의 동작 과정**

1. ROM (Read-Only Memory)
- ROM은 읽기 전용 메모리로, 시스템의 기본적인 정보를 저장한다.

2. OS (Operation System)
- 운영체제(OS)는 SSD(HDD)에서 로드되어 RAM(임시 메모리)으로 이동한다.

3. 애플리케이션 로딩
- 워드, 카카오톡과 같은 애플리케이션은 RAM에 로드된다.
- 해당 애플리케이션 내에서 파일을 열면, 파일 데이터도 RAM으로 이동한다.

4. 파일 저장 및 메모리 해제
- 애플리케이션을 닫을 때, 파일 내용은 SSD(HDD)에 저장된다.
- 이후 RAM에서 해당 파일 데이터는 삭제된다.

<br><br><br>

------------
<br>

**단일 cpu 코어의 성능 발전 속도**

초기 25% : 반도체 공정기술에 따라 성장했다. <br>
중기 52% : 급격한 발전은 컴퓨터구조에 대한 이론 연구가 활발이 진행되고 적용되었기 때문이다. <br>
후기 22% : 이론적용은 거의 끝났고 전력 소모, 발열 등 물리적인 한계들이 있다. <br>
<img src="assets/img/Uniprocessor Performance.png" alt="Uniprocessor Performance" />

<br><br>

------------

## **Computer Architecture**
Computer Architecture란? <br>
: ISA를 통한 HW와 SW의 중간 계층을 말한다. (= HW/SW Interface)<br>

ISA(Instruction Set Architecture)란?
: 추상화된 인터페이스. SW 최하단에서 HW와 소통하기 위한 일종의 언어

<img src="assets/img/Computer Architecture.png" alt="Computer Architecture" width="500"/>

<br><br>

**Eight Great Ideas**

1. Design for ***Moore's Law***
2. Use ***abstraction*** to simplify design
3. Make the ***common case fast***
4. Performance via ***parallelism***
5. Performance via ***pipelining***
6. Performance via ***prediction***
7. ***Hierarchy*** of memories
8. ***Dependability*** via redundancy

컴퓨터의 속도를 증가시킨 이론적인 아이디어들
<br>

--------------------

<br><br>

## **Data in the Computer**

컴퓨터에서 데이터를 표현하고 저장하는 데 사용되는 기본 단위들에는 **비트(bit)**, **바이트(byte)**, **워드(word)** 등이 있다.
<br><br>

**bit**

- **가장 작은 데이터 단위** 이다. 
- 하나의 bit는 **0 또는 1**을 나타낸다.

**byte**

- **8bits**로 구성된 단위이다. (8bits = 1byte)
- 256개의 서로 다른 값을 나타낼 수 있다. ($$2^{8}=256$$)
- 컴퓨터에서 **문자**(예: ASCII 문자 하나)를 표현하거나 **작은 데이터를 저장**하는 데 주로 사용된다.
- 메모리의 주소는 1byte 단위이다. 

**word**

- **CPU 아키텍처에 따라 크기가 다른 데이터 단위**이다.
- 일반적으로 **32-bit(4-byte)** 또는 **64-bit(8-byte)**를 의미한다.
  - **32-bit 시스템**에서는 word가 4bytes(32bits).
  - **64-bit 시스템**에서는 word가 8bytes(64비트).
- **word**는 CPU가 한 번에 처리할 수 있는 데이터의 크기를 의미하며, 컴퓨터의 성능과 관련이 있다.
- **doubleword**: **64-bits**, 즉 2개의 word(32bits)를 합친 것.
