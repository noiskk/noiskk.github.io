---
layout: post
title: "[CA] Instruction Set 3"
date: 2024-09-23 12:00:00 +0900
categories: Computer_Architecture
---
## Translating and Starting a Program

---

### 1. **Translation & Startup**
<br>

**Translation**
- High-level Language 로 작성된 프로그램을 기계가 이해할 수 있는 **Machine Language**로 변환하는 과정. 
- **Complier**
: C --> Assembly language
- **Assembler**
: Assembly language --> Machine language
- **Linker**
: 여러 object file 과 외부 라이브러리를 합침.
- **Loader**
: 프로그램을 실행하기 위해 메모리로 로드시킴. 


### 2. **Assembler 
- The assembler turns the assembly language program into
an object file
- Symbol table keeps track of labels used in branches and
data transfer instructions.

### 3. **Producing an Object Module (목적 모듈 생성)**

번역된 프로그램은 **Object Module(목적 모듈)**로 저장됩니다. 이 과정에서 컴파일러 또는 어셈블러는 프로그램의 각 부분을 독립적인 목적 파일로 변환합니다. 목적 모듈은 다음과 같은 정보를 포함합니다:

- **기계어 코드**: 실행될 기계어 명령어들.
- **심볼 테이블(Symbol Table)**: 함수나 변수에 대한 정보. 이 정보는 나중에 링크 단계에서 사용됩니다.
- **재배치 정보(Relocation Information)**: 프로그램이 메모리에 적재될 때, 코드와 데이터가 어디에 위치해야 하는지를 나타냅니다.

목적 모듈은 여러 개의 소스 코드 파일에서 생성될 수 있으며, 각 파일은 독립적인 모듈을 형성합니다.

### 4. **Linking Object Module (목적 모듈 연결)**

**링킹(Linking)**은 여러 개의 목적 모듈을 하나의 실행 가능한 프로그램으로 결합하는 과정입니다. 이 단계에서 **링커(Linker)**가 다음 작업을 수행합니다:

- **심볼 해석(Symbol Resolution)**: 각 목적 모듈에 정의된 함수와 변수를 연결하여 참조를 해결합니다. 예를 들어, 한 모듈에서 선언된 변수가 다른 모듈에서 참조될 때, 이 참조가 제대로 연결됩니다.
- **재배치(Relocation)**: 각 모듈의 코드와 데이터가 메모리에서 적절한 위치에 배치될 수 있도록 조정됩니다.

링킹 과정이 끝나면, 모든 모듈은 하나의 실행 파일로 결합되며, 이 파일은 프로그램의 실행 준비가 완료된 상태가 됩니다.

### 5. **Loading a Program (프로그램 적재)**

프로그램이 실행되기 위해서는 **로더(Loader)**가 실행 파일을 메모리에 적재해야 합니다. 이 과정은 주로 운영체제가 담당하며, 다음과 같은 단계를 거칩니다:

1. **메모리 할당**: 프로그램이 실행될 메모리 공간을 할당.
2. **코드와 데이터 로드**: 실행 파일의 코드와 데이터를 메모리로 읽어들임.
3. **실행 준비**: 프로그램의 엔트리 포인트(시작점)를 설정하여 제어권을 프로그램에 넘김.

이 과정을 통해 프로그램은 CPU의 제어를 받아 실제로 실행됩니다.

### 6. **Dynamic Linking**

동적 링크는 프로그램을 실행할 때, 필요한 라이브러리들이 런타임에 별도로 결합되는 방식입니다. 즉, 라이브러리의 코드가 실행 파일에 포함되지 않고, 프로그램이 실행될 때 운영체제가 **동적 라이브러리(.dll, .so 등)**를 로드해서 연결해줍니다.

동적 링크의 특징
-	작은 파일 크기: 실행 파일에는 라이브러리의 참조만 포함되므로, 실행 파일 자체는 상대적으로 작습니다.
- 공유: 여러 프로그램이 같은 동적 라이브러리를 공유해서 사용할 수 있습니다. 즉, 라이브러리를 한 번만 설치해도 여러 프로그램에서 사용할 수 있습니다.
- 업데이트 용이: 라이브러리를 업데이트해도 프로그램을 다시 컴파일할 필요가 없습니다. 프로그램은 최신 라이브러리를 런타임에 동적으로 사용합니다.
- 런타임 의존성: 프로그램이 실행될 때 필요한 라이브러리가 없거나 잘못된 버전의 라이브러리가 있으면 실행이 실패할 수 있습니다.


### 7. Lazy Linkage

<br>

-----

```
void swap(long long int v[], long long int k)
{
  long long int temp;
  temp = v[k];
  v[k] = v[k+1];
  v[k+1] = temp;
}

(v in X0, k in X1, temp in X9)

swap: LSL X10,X1,#3 // X10 = k * 8
      ADD X10,X0,X10 // X10 = address of v[k]
      LDUR X9,[X10,#0] // X9 = v[k]
      LDUR X11,[X10,#8] // X11 = v[k+1]
      STUR X11,[X10,#0] // v[k] = X11 (v[k+1])
      STUR X9,[X10,#8] // v[k+1] = X9 (v[k])
      BR LR // return to calling routine 
```



-----



<br>


---


