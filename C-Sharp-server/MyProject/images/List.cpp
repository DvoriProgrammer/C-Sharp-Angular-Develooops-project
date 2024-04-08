#include "List.h"

//------------------------------------------------
//  class Link implementation
//------------------------------------------------
List::Link::Link(int val, Link* nxt) : value(val), next(nxt)
{}



//--------------------------------------------
//  class List implementation
//--------------------------------------------
List::List() : head(nullptr)
{

}



List::~List()
{
	clear();
}

void List::clear()
{
	// empty all elements from the List
	Link* next;
	for (Link* p = head; p != nullptr; p = next)
	{
		next = p->next;
		delete p;
	}
	head = nullptr;
}

bool List::isEmpty() const
{
	return head == nullptr;
}
void List::add(int val)
{
	//Add a new value to the front of a Linked List
	head = new Link(val, head);
	if (head == nullptr)
		throw "failed in memory allocation";
}
void List::insert(int key) {
	if (!head || head && head->value < key)
		add(key);
	else {
		Link* p;
		for (p = head; p->next != nullptr; p = p->next) {
			if (key >= p->next->value) {
				p->next = new Link(key, p->next);
				if (p->next == nullptr)
					throw "failed in memory allocation";
				return;
			}
		}
		p->next = new Link(key, nullptr);
		if (p->next == nullptr)
			throw "failed in memory allocation";
	}
}
//void List::insert(int key)
//{
//	Link* nextr,*newl;
//	if (head == nullptr){
//		head->value = key;
//	head->next = nullptr;}
//	for (Link* p = head; p != nullptr; p = nextr)
//	{
//		if (p->value < key)
//			nextr = p;
//		else {
//			newl = new Link(key, p->next);
//			nextr->next = newl;
//		}
//			
//		nextr = p->next;
//		
//	}
//}

int List::firstElement() const
{
	// return first value in List
	if (isEmpty())
		throw "the List is empty, no first Element";
	return head->value;
}

bool  List::search(int val) const
{
	// search val in List
	for (Link* p = head; p != nullptr; p = p->next)
		if (val == p->value)
			return true;
	// not found
	return false;
}

void List::removeFirst()
{
	if (isEmpty())
		throw "the List is empty, no Elements to remove";
	Link* p = head;
	head = p->next;
	delete p;
}

void List::remove(int key)
{
	if(!search(key))
		throw "value not found";
	Link* l;
	for (Link* p = head; p != nullptr; p = p->next) {
		if (p->next) {
			if (key == p->next->value) {
				l = p->next;
				p->next = l->next;
			}
		}

	}
	
	
}
List::List(const List& l)
{
	Link* src, * trg;
	if (l.head == nullptr)
		head = nullptr;
	else
	{
		head = new Link((l.head)->value, nullptr);
		src = l.head->next;
		trg = head;
		while (src != nullptr)
		{
			trg->next = new Link(src->value, nullptr);
			src = src->next;
			trg = trg->next;
		}
	}
}
List& List::operator=(const List& l) { //assignment operator
	if (this->head)
		clear();
	Link* src, * trg;
	if (l.head == nullptr)
		head = nullptr;
	else
	{
		head = new Link((l.head)->value, nullptr);
		src = l.head->next;
		trg = head;
		while (src != nullptr)
		{
			trg->next = new Link(src->value, nullptr);
			src = src->next;
			trg = trg->next;
		}
	}
	return *this;
}
List::List(List&& source)//move ctor
{
	head = source.head;

	source.head = nullptr; //very important!!!	
}

List& List::operator=(List&& l)// move assignment operator
{
	if (head)
		clear();

	head = l.head;
	l.head = nullptr; //very important!!!		

	return *this;
}
std::ostream& operator<<(std::ostream& lhs, const List& list) {
	
	
	List::Link* p, * trg;
	//p = list.head;
	lhs << "values";
	for ( p = list.head; p != nullptr; p = p->next){
		lhs << " " << p->value;}

	return lhs;
}