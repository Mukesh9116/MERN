#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
using namespace std;

// -------- Contiguous Allocation --------
class ContiguousFile {
    vector<int> disk;
public:
    ContiguousFile(int n) : disk(n, 0) {}
    bool allocate(int size) {
        for (int i = 0; i + size <= (int)disk.size(); i++) {
            bool free = true;
            for (int j = 0; j < size; j++) {
                if (disk[i + j]) { free = false; break; }
            }
            if (free) {
                fill(disk.begin() + i, disk.begin() + i + size, 1);
                cout << "Allocated (Contiguous) from block " 
                     << i << " to " << i + size - 1 << "\n";
                return true;
            }
        }
        cout << "No contiguous space available\n";
        return false;
    }
};

// -------- Linked-List Allocation --------
struct Block { 
    int id; 
    Block* next; 
};

class LinkedFile {
    vector<int> freeBlocks;
    mt19937 rng;   // random generator
public:
    LinkedFile(int n) : rng(random_device{}()) {
        for (int i = 0; i < n; i++) freeBlocks.push_back(i);
    }

    void allocate(int size) {
        if (size > (int)freeBlocks.size()) { 
            cout << "Not enough space\n"; 
            return; 
        }
        // modern shuffle
        shuffle(freeBlocks.begin(), freeBlocks.end(), rng);

        Block* head = nullptr;
        for (int i = 0; i < size; i++) {
            Block* b = new Block{freeBlocks.back(), head};
            head = b;
            freeBlocks.pop_back();
        }

        cout << "Blocks linked (Linked-list): ";
        for (Block* p = head; p; p = p->next) cout << p->id << " ";
        cout << "\n";
    }
};

// -------- Indexed Allocation --------
class IndexedFile {
    vector<int> freeBlocks;
public:
    IndexedFile(int n) { 
        for (int i = 0; i < n; i++) freeBlocks.push_back(i); 
    }

    void allocate(int size) {
        if (size + 1 > (int)freeBlocks.size()) { 
            cout << "Not enough space\n"; 
            return; 
        }
        int indexBlock = freeBlocks.back(); 
        freeBlocks.pop_back();

        vector<int> blocks;
        for (int i = 0; i < size; i++) {
            blocks.push_back(freeBlocks.back());
            freeBlocks.pop_back();
        }

        cout << "Index block (Indexed): " << indexBlock << " -> ";
        for (int b : blocks) cout << b << " ";
        cout << "\n";
    }
};

// -------- Main for Demo --------
int main() {
    ContiguousFile c(20);
    LinkedFile l(20);
    IndexedFile i(20);

    c.allocate(5);   // allocate 5 contiguous blocks
    l.allocate(4);   // allocate 4 linked blocks
    i.allocate(6);   // allocate 6 with indexed allocation
}
