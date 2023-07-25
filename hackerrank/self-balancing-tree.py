class BinarySearchTree:
    def __init__(self, info):
        self.info = info
        self.left = None
        self.right = None
        self.ht = None

def insert(root, data):
    if root is None:
        root = BinarySearchTree(data)
        root.ht = setHeight(root)
        return root
    if data < root.info:
        root.left = insert(root.left, data)
    else:
        root.right = insert(root.right, data)
    
    balance = height(root.left) - height(root.right)
    
    if balance > 1:
        if height(root.left.left) >= height(root.left.right):
            root = rightRotation(root)
        else:
            root.left = leftRotation(root.left);
            root = rightRotation(root);
    elif balance < -1:
        if height(root.right.right) >= height(root.right.left):
            root = leftRotation(root)
        else:
            root.right = rightRotation(root.right)
            root = leftRotation(root)   
    else:
        root.ht = setHeight(root)
    return root


def rightRotation(root):
    newRoot = root.left;
    root.left = newRoot.right;
    newRoot.right = root;
    root.ht = setHeight(root);
    newRoot.ht = setHeight(newRoot);
    return newRoot

def leftRotation(root):
    newRoot = root.right;
    root.right = newRoot.left;
    newRoot.left = root;
    root.ht = setHeight(root);
    newRoot.ht = setHeight(newRoot);
    return newRoot

def height(root):
    if root == None:
        return -1
    else :
        return root.ht

def setHeight(root):
    if root == None:
        return -1;
    else:
        return 1 + max(height(root.left), height(root.right))


def InOrder(root):
    if root:
        InOrder(root.left)
        balanceFactor = height(root.left) - height(root.right)
        print ("%d(BF=%d)" % (root.info, balanceFactor), end = " ")
        InOrder(root.right)
def PreOrder(root):
    if root:
        balanceFactor = height(root.left) - height(root.right)
        print ("%d(BF=%d)" % (root.info, balanceFactor), end = " ")        
        PreOrder(root.left)
        PreOrder(root.right)        
        

if __name__ == "__main__":
    t = int(input())
    arr = list(map(int, input().split()))
    root = None
    for i in range(t):
        root = insert(root, arr[i])
    root = insert(root, int(input()))
    #print
    InOrder(root)
    print()
    PreOrder(root)